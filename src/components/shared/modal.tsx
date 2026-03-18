import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"


interface ModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
    title: string
    description: string
    classname?:string
}


const Modal = ({ open, onOpenChange, children, title, description, classname }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
        <DialogContent className={cn("sm:max-w-md", classname)}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
  )
}
export default Modal