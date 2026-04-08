// create a button component that will have the following props:
// - size: sm, md, lg
// - children: React.ReactNode

export default function Btn({ size = "md", children, ...props }: { size?: "sm" | "md" | "lg", children?: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const sizeClasses = {
        sm: "text-lg py-4",
        md: "text-lg py-5",
        lg: "text-lg py-6",
    }

    return (
        <button className={`text-center btn-hover bg-black text-white rounded w-full ${sizeClasses[size]}`} {...props}>
            <span className="btn__text">{children}</span>
        </button>
    )
}