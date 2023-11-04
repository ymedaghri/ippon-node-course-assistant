"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import CreateTicketDialog from "./createTicketDialog"
import DeleteTicketDialog from "./deleteTicketDialog"
import CreateProjectDialog from "./createProjectDialog"
import {
  Category,
  CategoryType,
  Project,
  ProjectApi,
  Status,
  StatusType,
  backendUrl,
  getRequest,
} from "./constants"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import DeleteProjectDialog from "./deleteProjectDialog"

export default function Kanban() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project>()

  useEffect(() => {
    getRequest(`${backendUrl}/kanban-projects`)
      .then((allProjects) => {
        setProjects([
          ...allProjects.map((project: ProjectApi) => {
            return {
              ...project,
              TODO: getTicketsAtStatus(project, Status.TODO),
              DOING: getTicketsAtStatus(project, Status.DOING),
              DONE: getTicketsAtStatus(project, Status.DONE),
            }
          }),
        ])
      })
      .catch((error) =>
        setError(
          `Erreur lors de la communication avec ${backendUrl}/kanban-projects en mode GET. ${error.message}`,
        ),
      )
  }, [])

  const getTicketsAtStatus = (project: ProjectApi, status: StatusType) => {
    return project.tickets
      .filter((ticket) => ticket.status === status)
      .map((ticket) => ({
        ...ticket,
        color: getTicketColor(ticket.category),
      }))
  }

  const getTicketColor = (category: CategoryType) => {
    switch (category) {
      case Category.ETUDE_FONDS_MARINS:
        return "bg-blue-500"
      case Category.BIOLOGIE_MARINE:
        return "bg-yellow-500"
      case Category.CONSERVATION_MARINE:
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHoverColor = (category: CategoryType) => {
    switch (category) {
      case Category.ETUDE_FONDS_MARINS:
        return "hover:fill-blue-300"
      case Category.BIOLOGIE_MARINE:
        return "hover:fill-yellow-300"
      case Category.CONSERVATION_MARINE:
        return "hover:fill-green-300"
      default:
        return "hover:fill-gray-300"
    }
  }

  const handleProjectChange = (value: string) => {
    const project = projects.find((project) => project.id === value)
    if (project) {
      setSelectedProject({ ...project })
    }
  }

  function handleOnDragEnd(result: any) {
    if (result.destination && selectedProject) {
      const destinationStatus = result.destination.droppableId as
        | "TODO"
        | "DOING"
        | "DONE"
      const origineStatus = result.source.droppableId as
        | "TODO"
        | "DOING"
        | "DONE"
      const index = result.source.index

      const draggedTicket = selectedProject[origineStatus][index]

      selectedProject[origineStatus] = [
        ...selectedProject[origineStatus].filter(
          (ticket) => ticket.id != draggedTicket.id,
        ),
      ]

      draggedTicket.status = destinationStatus
      selectedProject[destinationStatus].push(draggedTicket)

      setSelectedProject({ ...selectedProject })
      setProjects([
        ...projects.filter((project) => project.id != selectedProject.id),
        selectedProject,
      ])
    }
  }

  return (
    <main className="text-gray-900  antialiased">
      {error && (
        <AlertDialog open={error !== null}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Erreur !</AlertDialogTitle>
              <AlertDialogDescription className="w-96 break-words">
                {error}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setError(null)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <div className="flex justify-center gap-1 px-10 pt-4">
        <CreateProjectDialog
          setProjects={setProjects}
          projects={projects}
          setSelectedProject={setSelectedProject}
          setError={setError}
        />
        <Select value={selectedProject?.id} onValueChange={handleProjectChange}>
          <SelectTrigger className="focus:ring-3 focus:border-none">
            <SelectValue
              className="outline-none"
              placeholder="Selectionner un projet"
            />
          </SelectTrigger>
          <SelectContent className="outline-none">
            {projects.map((project, index) => (
              <SelectItem
                className="outline-none"
                value={project.id}
                key={index}
              >
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DeleteProjectDialog
          projects={projects}
          setProjects={setProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setError={setError}
        />
      </div>
      <main className="grid grid-cols-1 gap-10 px-10 py-4 md:grid-cols-3">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {Object.keys(Status).map((status: StatusType, index) => (
            <Card className="h-[630px]" key={index}>
              <CardHeader className="relative flex items-center justify-center bg-red-500 text-white">
                <CardTitle>{status}</CardTitle>
                {selectedProject && (
                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center ">
                    <CreateTicketDialog
                      status={status}
                      selectedProject={selectedProject}
                      getTicketColor={getTicketColor}
                      setError={setError}
                      setSelectedProject={setSelectedProject}
                    />
                  </span>
                )}
              </CardHeader>
              <Droppable droppableId={status} key={index}>
                {(provided) => (
                  <CardContent
                    className="grid h-[550px] auto-rows-max grid-cols-2 gap-x-4 overflow-auto pt-4 "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {selectedProject &&
                      selectedProject[status as "TODO" | "DOING" | "DONE"].map(
                        (ticket, index) => (
                          <Draggable
                            key={`draggable_ID_${status}_${index}`}
                            draggableId={`draggable_ID_${status}_${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                className={`${ticket.color} mb-4 w-full`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardHeader>
                                  <div className="flex w-full justify-between">
                                    <CardTitle className="w-2/3 truncate text-lg">
                                      {ticket.code}
                                    </CardTitle>
                                    <DeleteTicketDialog
                                      getHoverColor={getHoverColor}
                                      selectedProject={selectedProject}
                                      ticket={ticket}
                                      setError={setError}
                                      setSelectedProject={setSelectedProject}
                                    />
                                  </div>
                                </CardHeader>
                                <CardContent className="truncate text-sm">
                                  {ticket.description}
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ),
                      )}
                    {provided.placeholder}
                  </CardContent>
                )}
              </Droppable>
            </Card>
          ))}
        </DragDropContext>
      </main>
    </main>
  )
}
