export function PageFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-muted-foreground mt-6 border-t pt-4 text-center text-xs">
      © {currentYear} Vendorzo by{" "}
      <a
        href="https://eastrixlabs.vercel.app/"
        target="_blank"
        rel="noreferrer"
        className="hover:text-foreground underline-offset-3 hover:underline"
      >
        Eastrix Labs
      </a>
      . All rights reserved.
    </footer>
  )
}
