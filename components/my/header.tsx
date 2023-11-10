"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { UserButton, useSession, useUser } from "@clerk/nextjs"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tic Tac Toe",
    href: "/exercices/tic-tac-toe",
    description:
      "Le jeu de Tic Tac Toe entre un front NextsJS et un Back Express en TDD.",
  },
  {
    title: "Kanban",
    href: "/exercices/kanban",
    description:
      "Outil de gestion visuel pour le suivi d'un projet / des tâches à réaliser par une équipe",
  },
  {
    title: "Trivial Pursuit",
    href: "/exercices/trivia",
    description: "La partie front d'Un kata de refactoring bien connu",
  },
]

export default function Header() {
  const { session } = useSession()
  const { user } = useUser()
  return (
    <header className="bg-white">
      <nav>
        <div className="flex">
          <Image
            className="p-4"
            width="224"
            height="37"
            src="https://blog.ippon.fr/assets/images/logo-ippon-blog-horizontal-3.svg"
            alt="Ippon Logo"
          />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`hidden sm:flex ${navigationMenuTriggerStyle()}`}
                  >
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="flex w-full">
                <NavigationMenuTrigger className="truncate">
                  Exercices
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-full gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component, index) => (
                      <li key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={component.href}
                            className={
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            }
                          >
                            <div className="text-sm font-medium leading-none">
                              {component.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {component.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <UserButton afterSignOutUrl="/" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  )
}
