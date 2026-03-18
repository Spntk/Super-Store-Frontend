import Modal from "@/components/shared/modal"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"

interface DeleteAdminCustomersProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    userNamme?: string
    onConfirm: () => void
    isLoading?: boolean
}

const DeleteAdminCustomers = ({open, onOpenChange, userNamme, onConfirm, isLoading}: DeleteAdminCustomersProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Delete Customer" description={`Are you sure you want to Delete "${userNamme}"?`}>
        <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="cursor-pointer">
                Cancel
            </Button>
            <Button onClick={onConfirm} disabled={isLoading} variant="destructive" className="transition-colors hover:bg-red-800  cursor-pointer">
                {isLoading ? <span><Loader2 className="h-5 w-5 animate-spin" /></span> : <span className="flex items-center gap-1"><Trash2/>Delete</span>}
            </Button>
        </div>
    </Modal>
  )
}
export default DeleteAdminCustomers