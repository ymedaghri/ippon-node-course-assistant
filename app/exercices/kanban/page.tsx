"use client"

import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef, useState } from "react";

const allProjects: { name: string, todo: string[], doing: string[], done: string[] }[] = [
    { name: "TicTacToe", todo: ["bg-blue-500"], doing: [], done: ["bg-blue-500", "bg-green-500", "bg-blue-500"] },
    { name: "Paradise", todo: [], doing: ["bg-green-500"], done: ["bg-green-500", "bg-green-500"] },
    { name: "Atmosphere", todo: ["bg-yellow-500"], doing: [], done: ["bg-blue-500"] }
]
export default function kanban() {

    const [projects, setProjects] = useState<string[]>(allProjects.map(p => p.name))
    const inputNameRef = useRef<HTMLInputElement | null>(null)
    const [selectedProject, setSelectedProject] = useState<{ name: string, todo: string[], doing: string[], done: string[] }>();

    const getRandomColor = () => {

        const randomNumber = Math.round(Math.random() * 2)
        switch (randomNumber) {
            case 0:
                return "bg-green-500"
            case 1:
                return "bg-yellow-500"
            case 2:
                return "bg-blue-500"
            default:
                return "bg-black"
        }
    }

    const handleAddProjectOnClick = () => {
        if (inputNameRef.current) {
            const newProject = { name: inputNameRef.current.value, todo: [], doing: [], done: [] };
            allProjects.push(newProject)
            setProjects([...projects, newProject.name]);
            setSelectedProject(newProject);
        }
    }

    const handleProjectChange = (value: string) => {
        const project = allProjects.find(project => project.name === value)!
        setSelectedProject(project)
    }

    const handleAddTodoOnClick = () => {
        if (selectedProject) {
            const project = allProjects.find(project => project.name === selectedProject.name)!
            project.todo = [...selectedProject.todo, getRandomColor()]
            setSelectedProject({ ...project })
        }
    }

    const handleAddDoingOnClick = () => {
        if (selectedProject) {
            const project = allProjects.find(project => project.name === selectedProject.name)!
            project.doing = [...selectedProject.doing, getRandomColor()]
            setSelectedProject({ ...project })
        }
    }

    const handleAddDoneOnClick = () => {
        if (selectedProject) {
            const project = allProjects.find(project => project.name === selectedProject.name)!
            project.done = [...selectedProject.done, getRandomColor()]
            setSelectedProject({ ...project })
        }
    }


    return (
        <main className="text-gray-900  antialiased">
            <div className="flex justify-center gap-1 px-10 pt-4">


                <Dialog>
                    <DialogTrigger asChild className="focus:ring-3 focus:border-none">
                        <Button variant="outline">Nouveau projet</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Nouveau projet</DialogTitle>
                            <DialogDescription>
                                Entrez les informations puis cliquer sur Save.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nom
                                </Label>
                                <Input
                                    ref={inputNameRef}
                                    id="name"
                                    defaultValue="Antares XV"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogClose asChild>
                            <Button type="button" onClick={handleAddProjectOnClick}>
                                Save and Close
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
                <Select value={selectedProject?.name} onValueChange={handleProjectChange}>
                    <SelectTrigger className="focus:ring-3 focus:border-none">
                        <SelectValue className="outline-none" placeholder="Selectionner un projet" />
                    </SelectTrigger>
                    <SelectContent className="outline-none">
                        {projects.map(project => (
                            <SelectItem className="outline-none" value={project}>{project}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <main className="flex justify-center gap-10 px-10 pt-4">
                <Card className="w-1/3 border-red-500 h-[630px]">
                    <CardHeader className="bg-red-500 text-white flex items-center justify-center relative">
                        <CardTitle>
                            TODO
                        </CardTitle>
                        <span className="border border-white bg-red-300 text-white text-xl font-semibold w-10 h-10 rounded-lg flex items-center justify-center absolute bottom-4 right-4 cursor-pointer"
                            onClick={handleAddTodoOnClick}>
                            +
                        </span>
                    </CardHeader>
                    <ScrollArea className="h-[550px] w-full">
                        <CardContent className="grid grid-cols-3 gap-2 p-3">
                            {selectedProject?.todo.map(element => (
                                <div className="col-span-1 flex items-center justify-center">
                                    <div className={`w-32 h-32 ${element} rounded-lg flex items-center justify-center text-white text-xl`}>Circle 2</div>
                                </div>
                            ))}
                        </CardContent>
                    </ScrollArea>
                </Card>
                <Card className="w-1/3 border-red-500 h-[630px]">
                    <CardHeader className="bg-red-500 text-white flex items-center justify-center relative">
                        <CardTitle>
                            DOING
                        </CardTitle>
                        <span className="border border-white bg-red-300 text-white text-xl font-semibold w-10 h-10 rounded-lg flex items-center justify-center absolute bottom-4 right-4 cursor-pointer"
                            onClick={handleAddDoingOnClick}>
                            +
                        </span>
                    </CardHeader>
                    <ScrollArea className="h-[550px] w-full">
                        <CardContent className="grid grid-cols-3 gap-2 p-3">
                            {selectedProject?.doing.map(element => (
                                <div className="col-span-1 flex items-center justify-center">
                                    <div className={`w-32 h-32 ${element} rounded-lg flex items-center justify-center text-white text-xl`}>Circle 2</div>
                                </div>
                            ))}
                        </CardContent>
                    </ScrollArea>
                </Card>
                <Card className="w-1/3 border-red-500 h-[630px]">
                    <CardHeader className="bg-red-500 text-white flex items-center justify-center relative">
                        <CardTitle>
                            DONE
                        </CardTitle>
                        <span className="border border-white bg-red-300 text-white text-xl font-semibold w-10 h-10 rounded-lg flex items-center justify-center absolute bottom-4 right-4 cursor-pointer"
                            onClick={handleAddDoneOnClick}>
                            +
                        </span>
                    </CardHeader>
                    <ScrollArea className="h-[550px] w-full">
                        <CardContent className="grid grid-cols-3 gap-2 p-3">
                            {selectedProject?.done.map(element => (
                                <div className="col-span-1 flex items-center justify-center">
                                    <div className={`w-32 h-32 ${element} rounded-lg flex items-center justify-center text-white text-xl`}>Circle 2</div>
                                </div>
                            ))}
                        </CardContent>
                    </ScrollArea>
                </Card>
            </main>
        </main >
    )
}