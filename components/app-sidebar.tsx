import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
    },
    {
      title: "Accounts",
      url: "#",
    },
    {
      title: "Transactions",
      url: "#",
    },
    {
      title: "Report",
      url: "#",
      items:[ {title: "Report",
      url: "#", isActive: true,},]
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-neutral-200 flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/bnw_record.png"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">ReCord</span>
                  <span className="">Aldrich Santiago</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <>
              {item.items ? (<>
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item?.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item?.items?.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
              </>) : (<>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  {item.title}{" "}
                </SidebarMenuButton>
              </SidebarMenuItem>
              </>)}
              
              </>

            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
