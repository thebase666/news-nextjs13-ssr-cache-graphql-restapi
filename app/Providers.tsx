'use client'
import { ThemeProvider } from 'next-themes'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    // 给明暗 用'use client' 但是里面的children 默认还是server redux也是这样配置 
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}

export default Providers