import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Icons } from "@/components/my/icons"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Category,
  CategoryType,
  Project,
  backendUrl,
  postRequest,
} from "./constants"

export default function CreateTicketDialog({
  status,
  selectedProject,
  setError,
  setSelectedProject,
  getTicketColor,
}: {
  status: string
  selectedProject: Project
  setSelectedProject: Dispatch<SetStateAction<Project | null>>
  setError: Dispatch<SetStateAction<string | null>>
  getTicketColor: (category: CategoryType) => string
}) {
  const [dialogOpened, setDialogOpened] = useState(false)
  const [pending, setPending] = useState(false)
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  const isButtonDisabled =
    code.trim() === "" || description.trim() === "" || category.trim() === ""

  const handleCreateTicketOnClick = () => {
    if (!isButtonDisabled) {
      setPending(true)

      postRequest(
        `${backendUrl}/kanban-projects/${selectedProject.id}/tickets`,
        {
          category: category,
          code: code,
          description: description,
          status,
        },
      )
        .then((createdTicket) => {
          selectedProject[status as "TODO" | "DOING" | "DONE"].push({
            ...createdTicket,
            color: getTicketColor(createdTicket.category),
          })
          setSelectedProject({ ...selectedProject })
          setCategory("")
          setCode("")
          setDescription("")
        })
        .catch((error) =>
          setError(
            `Erreur lors de la communication avec ${backendUrl}/kanban-projects/${selectedProject.id}/tickets en mode POST. ${error.message}`,
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
        <Icons.add
          className="h-9 w-9
                         cursor-pointer
                         hover:fill-red-400"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau ticket</DialogTitle>
          <DialogDescription>
            Entrez les informations puis cliquer sur Save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="category" className="text-right">
              Categorie
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selectionner une catégorie" />
              </SelectTrigger>
              <SelectContent id="category">
                <SelectItem value={Category.BIOLOGIE_MARINE}>
                  Biologie Marine
                </SelectItem>
                <SelectItem value={Category.CONSERVATION_MARINE}>
                  Conservation Marine
                </SelectItem>
                <SelectItem value={Category.ETUDE_FONDS_MARINS}>
                  Etude des fonds marins
                </SelectItem>
              </SelectContent>
            </Select>
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
              onClick={handleCreateTicketOnClick}
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
