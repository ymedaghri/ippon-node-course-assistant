import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-4 text-gray-900 antialiased">
      <Card className="w-8/12">
        <CardHeader>
          <CardTitle>Assistant Formation</CardTitle>
          <CardDescription>NodeJS</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl">
          Vous trouverez dans cet assistant les exercices mentionnés dans la
          formation sous la rubrique &quot;Exercices&quot; de la barre de menu.
        </CardContent>
      </Card>
    </main>
  )
}
