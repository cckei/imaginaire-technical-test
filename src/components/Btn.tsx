// create a button component that will have the following props:
// - size: sm, md, lg
// - children: React.ReactNode

export default function Btn({ size = "md", children, ...props }: { size?: "sm" | "md" | "lg", children?: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const sizeClasses = {
        sm: "text-sm py-4",
        md: "text-base py-5",
        lg: "text-lg py-6",
    }

    return (
        <button className={`bg-black text-white rounded w-full ${sizeClasses[size]}`} {...props}>
            {children}
        </button>
    )
}