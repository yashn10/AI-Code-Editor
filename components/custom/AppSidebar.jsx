import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import WorkspaceHistory from "./WorkspaceHistory"
import Sidebarfooter from "./SidebarFooter"

const AppSidebar = () => {
    return (
        <Sidebar className="bg-gray-800">
            <SidebarHeader />
            <SidebarContent className="p-4" style={{ scrollbarWidth: 'none' }}>
                <Button className="text-md font-sans font-medium">New Chat</Button>
                <WorkspaceHistory />
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <Sidebarfooter />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar