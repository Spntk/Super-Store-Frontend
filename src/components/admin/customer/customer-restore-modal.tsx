import Modal from "@/components/shared/modal"
import { Button } from "@/components/ui/button"
import { Loader2, RotateCcw } from "lucide-react"

interface RestoreAdminCustomersProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    userNamme?: string
    onConfirm: () => void
    isLoading?: boolean
}

const RestoreAdminCustomers = ({open, onOpenChange, userNamme, onConfirm, isLoading}: RestoreAdminCustomersProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Restore Customer" description={`Are you sure you want to restore "${userNamme}"?`}>
        <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="cursor-pointer">
                Cancel
            </Button>
            <Button onClick={onConfirm} disabled={isLoading} className="transition-colors hover:bg-green-800  cursor-pointer">
                {isLoading ? <span><Loader2 className="h-5 w-5 animate-spin" /></span> : <span className="flex items-center gap-1"><RotateCcw/>Restore</span>}
            </Button>
        </div>
    </Modal>
  )
}
export default RestoreAdminCustomers