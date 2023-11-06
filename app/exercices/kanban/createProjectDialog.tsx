import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction, useState } from "react"
import { Loader2 } from "lucide-react"
import { Project, backendUrl, postRequest } from "./constants"

export default function CreateProjectDialog({
  projects,
  setSelectedProject,
  setProjects,
  setError,
}: {
  projects: Project[]
  setSelectedProject: Dispatch<SetStateAction<Project | null>>
  setProjects: Dispatch<SetStateAction<Project[]>>
  setError: Dispatch<SetStateAction<string | null>>
}) {
  const [dialogOpened, setDialogOpened] = useState(false)
  const [pending, setPending] = useState(false)
  const [name, setName] = useState("")

  const isButtonDisabled = name.trim() === ""

  const handleAddProjectOnClick = () => {
    if (!isButtonDisabled) {
      setPending(true)

      postRequest(`${backendUrl}/kanban-projects`, { name })
        .then((createdProject) => {
          const newProject = {
            ...createdProject,
            TODO: [],
            DOING: [],
            DONE: [],
          }
          setSelectedProject(newProject)
          setProjects([...projects, newProject])
        })
        .catch((error) =>
          setError(
            `Erreur lors de la communication avec ${backendUrl}/kanban-projects en mode POST. ${error.message}`,
          ),
        )
        .finally(() => {
          setDialogOpened(false)
          setPending(false)
        })
    }
  }

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild className="focus:ring-3 focus:border-none">
        <Button variant="outline">Nouveau projet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau projet</DialogTitle>
          <DialogDescription>
            {`Entrez les informations puis cliquer sur "Enregistrer".`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {pending ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Action en cours
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleAddProjectOnClick}
              disabled={isButtonDisabled}
            >
              Enregistrer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
