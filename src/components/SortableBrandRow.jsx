import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Edit, Trash2, GripHorizontal } from "lucide-react"

export function SortableBrandCard({ brand, onEdit, onDelete, onClick }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: brand.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : "auto",
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`border border-border rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700 relative group transition-shadow ${isDragging ? "shadow-2xl ring-2 ring-primary" : "hover:shadow-lg"
                }`}
        >
            {/* Drag Handle - Visible on hover */}
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 left-1/2 -translate-x-1/2 p-2 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripHorizontal className="w-5 h-5" />
            </div>

            <div className="flex items-start justify-between mb-2">
                <div onClick={() => onClick(brand)} className="flex items-center gap-3 cursor-pointer ">
                    {brand.logo && (
                        <img src={brand.logo} alt={brand.name} width={30} height={30} />
                    )}
                    <h3
                        
                        className="text-xl font-bold cursor-pointer hover:text-primary transition-colors dark:text-white"
                    >
                        {brand.name}
                    </h3>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(brand); }}
                        className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(brand.id); }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {brand.description || "No description"}
            </p>

            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{brand._count?.tasks || 0} tasks</span>
                <span
                    className={`px-2 py-1 rounded ${brand.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                >
                    {brand.isActive ? "Active" : "Inactive"}
                </span>
            </div>
        </div>
    )
}