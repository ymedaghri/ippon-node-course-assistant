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
import { Icons } from "@/components/my/icons"
import { Dispatch, SetStateAction, useState } from "react"
import { Loader2 } from "lucide-react"
import {
  CategoryType,
  Project,
  Ticket,
  backendUrl,
  deleteRequest,
} from "./constants"

export default function DeleteTicketDialog({
  getHoverColor,
  selectedProject,
  ticket,
  setError,
  setSelectedProject,
}: {
  getHoverColor: (category: CategoryType) => string
  selectedProject: Project
  ticket: Ticket
  setSelectedProject: Dispatch<SetStateAction<Project | null>>
  setError: Dispatch<SetStateAction<string | null>>
}) {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [pending, setPending] = useState(false)

  const handleDeleteTicketOnClick = () => {
    setPending(true)

    deleteRequest(
      `${backendUrl}/kanban-projects/${selectedProject.id}/tickets/${ticket.id}`,
    )
      .then((_deletedTicket) => {
        selectedProject[ticket.status as "TODO" | "DOING" | "DONE"] =
          selectedProject[ticket.status as "TODO" | "DOING" | "DONE"].filter(
            (t) => t.id != ticket.id,
          )
        setSelectedProject({ ...selectedProject })
      })
      .catch((error) =>
        setError(
          `Erreur lors de la communication avec ${backendUrl}/kanban-projects/${selectedProject.id}/tickets/${ticket.id} en mode DELETE. ${error.message}`,
        ),
      )
      .finally(() => {
        setDialogOpened(false)
        setPending(false)
      })
  }

  return (
    <AlertDialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <AlertDialogTrigger asChild>
        <Icons.bin
          className={`h-6 w-6 cursor-pointer ${getHoverColor(ticket.category)}`}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {"Êtes vous sûr de vouloir supprimer ce ticket ?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {
              "Cette action es irréversible. Cela supprimera ce ticket de manière définitive."
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
              onClick={handleDeleteTicketOnClick}
            >
              Continuer
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
