import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dispatch, SetStateAction, useState } from "react"
import { Loader2 } from "lucide-react"
import { Project, backendUrl, deleteRequest } from "./constants"
import { Button } from "@/components/ui/button"

export default function DeleteProjectDialog({
  projects,
  setProjects,
  selectedProject,
  setSelectedProject,
  setError,
}: {
  projects: Project[]
  setProjects: Dispatch<SetStateAction<Project[]>>
  selectedProject: Project | undefined
  setSelectedProject: Dispatch<SetStateAction<Project | null>>
  setError: Dispatch<SetStateAction<string | null>>
}) {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [pending, setPending] = useState(false)

  const handleDeleteProjectAndItsTicketsOnClick = () => {
    if (selectedProject) {
      setPending(true)

      deleteRequest(`${backendUrl}/kanban-projects/${selectedProject.id}`)
        .then((deletedProject) => {
          const projectsUpdated = projects.filter(
            (project) => project.id !== deletedProject[1].id,
          )
          setProjects([...projectsUpdated])

          if (projectsUpdated.length) {
            setSelectedProject(projectsUpdated[0])
          } else {
            setSelectedProject(null)
          }
        })
        .catch((error) =>
          setError(
            `Erreur lors de la communication avec ${backendUrl}/kanban-projects/${selectedProject.id} en mode DELETE. ${error.message}`,
          ),
        )
        .finally(() => {
          setDialogOpened(false)
          setPending(false)
        })
    }
  }

  return (
    <AlertDialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={!selectedProject}>
          Supprimer projet
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {
              "Êtes vous sûr de vouloir supprimer ce projet et tous ses tickets ?"
            }
          </AlertDialogTitle>
          <AlertDialogDescription>
            {
              "Cette action es irréversible. Cela supprimera ce projet et tous ses tickets de manière définitive."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          {pending ? (
            <AlertDialogAction disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Action en cours
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              type="button"
              onClick={handleDeleteProjectAndItsTicketsOnClick}
            >
              Continuer
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
