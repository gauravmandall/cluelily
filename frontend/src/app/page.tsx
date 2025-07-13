import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Github, Monitor, Smartphone, Laptop } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">
            <span style={{ color: "#333333" }}>Clue</span>
            <span style={{ color: "#4CAF50" }}>Lily</span>
          </h1>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#download" className="text-sm font-medium hover:text-primary transition-colors">
            Download
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="https://github.com/gauravmandall/cluelily"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4 rounded-none">
                  Open Source Project
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  <span style={{ color: "#333333" }}>Clue</span>
                  <span style={{ color: "#4CAF50" }}>Lily</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
                  An independent open-source project built with passion and respect for innovation
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-none">
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-none bg-transparent">
                  <Link href="https://github.com/gauravmandall/cluelily">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Download Options</h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                Choose your platform and get started with ClueLily v1.0.8
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 max-w-4xl mx-auto">
              {/* macOS */}
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow rounded-none">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-gray-100 rounded-none">
                      <Laptop className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold">macOS</h3>
                      <p className="text-sm text-gray-600">For Mac computers</p>
                      <Badge variant="outline" className="rounded-none">
                        v1.0.8
                      </Badge>
                    </div>
                    <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049] rounded-none" asChild>
                      <Link href="https://github.com/gauravmandall/cluelily/releases/tag/v1.0.8">
                        <Download className="mr-2 h-4 w-4" />
                        Download .dmg
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Windows */}
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow rounded-none">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-blue-100 rounded-none">
                      <Monitor className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold">Windows</h3>
                      <p className="text-sm text-gray-600">For Windows PC</p>
                      <Badge variant="outline" className="rounded-none">
                        v1.0.8
                      </Badge>
                    </div>
                    <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049] rounded-none" asChild>
                      <Link href="https://github.com/gauravmandall/cluelily/releases/tag/v1.0.8">
                        <Download className="mr-2 h-4 w-4" />
                        Download .exe
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Linux */}
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow rounded-none">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-orange-100 rounded-none">
                      <Smartphone className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold">Linux</h3>
                      <p className="text-sm text-gray-600">For Linux distributions</p>
                      <Badge variant="outline" className="rounded-none">
                        v1.0.8
                      </Badge>
                    </div>
                    <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049] rounded-none" asChild>
                      <Link href="https://github.com/gauravmandall/cluelily/releases/tag/v1.0.8">
                        <Download className="mr-2 h-4 w-4" />
                        Download .AppImage
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                All packages available at:{" "}
                <Link
                  href="https://github.com/gauravmandall/cluelily/releases/tag/v1.0.8"
                  className="text-[#4CAF50] hover:underline font-medium"
                >
                  GitHub Releases
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">About ClueLily</h2>
                <p className="text-gray-600 md:text-lg">
                  An independent open-source project built with respect and admiration
                </p>
              </div>

              <Card className="p-8 bg-gradient-to-r from-gray-50 to-white border-l-4 border-l-[#4CAF50] rounded-none">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Disclaimer</h3>
                  <div className="text-gray-700 space-y-3 leading-relaxed">
                    <p>
                      <span style={{ color: "#333333" }}>Clue</span>
                      <span style={{ color: "#4CAF50" }}>Lily</span> is an independent open-source project and is not
                      affiliated with Cluely or its products. This project was initially created as a parody of Cluely's
                      funding rounds.
                    </p>
                    <p>
                      However, we have great respect for Cluely's founders{" "}
                      <Link
                        href="https://twitter.com/im_roy_lee"
                        className="text-[#4CAF50] hover:underline font-medium"
                      >
                        Roy Lee (@im_roy_lee)
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="https://twitter.com/neelyweely23"
                        className="text-[#4CAF50] hover:underline font-medium"
                      >
                        Neel Shanmugam (@neelyweely23)
                      </Link>{" "}
                      and acknowledge their entrepreneurial spirit.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:gap-4 items-center">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} ClueLily. Open source project.</p>
          <p className="text-xs text-gray-600">
            Made with ❤️ by{" "}
            <Link
              href="https://x.com/intent/follow?screen_name=gauravmandall"
              className="text-[#4CAF50] hover:underline underline-offset-4 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gaurav
            </Link>
          </p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="https://github.com/gauravmandall/cluelily"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            GitHub
          </Link>
          <Link
            href="https://github.com/gauravmandall/cluelily/releases"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Releases
          </Link>
          <Link
            href="https://github.com/gauravmandall/cluelily/issues"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Issues
          </Link>
        </nav>
      </footer>
    </div>
  )
}
