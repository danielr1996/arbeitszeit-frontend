export const Breakpoint = ()=> process.env.NODE_ENV == 'development' ? <div className="fixed z-50 text-xs font-bold text-[black] p-2">
    <span className="xs:inline-block sm:hidden rounded px-1 bg-[#facc15] p-1">XS</span>
    <span className="hidden sm:inline-block md:hidden rounded px-1 bg-[#facc15]">SM</span>
    <span className="hidden sm:hidden md:inline-block lg:hidden rounded px-1 bg-[#facc15]">MD</span>
    <span className="hidden lg:inline-block xl:hidden rounded px-1 bg-[#facc15]">LG</span>
    <span className="hidden xl:inline-block rounded px-1 bg-[#facc15]">XL</span>
</div> : null
