import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import CompanyTimeline from '@/components/company-timeline';
import TeamMember from '@/components/team-member';
import ValueCard from '@/components/value-card';
import { ChevronRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 mx-auto">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black to-transparent" />

          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-none px-3 py-1">
                Our Story
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                Powering Performance Across Industries
              </h1>
              <p className="text-zinc-400 md:text-lg max-w-[600px]">
                Founded by tech enthusiasts with a passion for performance, Tech
                Paradise creates cutting-edge computing solutions for both
                gaming enthusiasts and enterprise clients.
              </p>
            </div>
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-75 blur-lg"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Tech Paradise Headquarters"
                  className="relative rounded-lg object-cover z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative mx-auto">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-3 py-1">
              Our Mission
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Pushing the Boundaries of{' '}
              <span className="text-purple-500">Performance</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              At Tech Paradise, we believe that exceptional computing
              experiences start with exceptional hardware. Our mission is to
              push the boundaries of what's possible, creating systems that
              don't just meet expectations—they shatter them.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                  <p className="text-zinc-400">
                    We envision a world where technology enhances human
                    creativity, productivity, and connection. Whether for
                    gaming, content creation, or enterprise solutions, Tech
                    Paradise exists to build hardware that empowers users to
                    achieve their full potential.
                  </p>
                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <blockquote className="italic text-zinc-300">
                      "The future of computing isn't just about better specs or
                      faster processors. It's about creating systems that
                      disappear into the experience, letting users focus on what
                      matters—their work, their creativity, their gameplay."
                    </blockquote>
                    <p className="mt-2 text-sm text-zinc-500">
                      — Alex Chen, Founder & CEO
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <ValueCard
                title="Innovation"
                description="We constantly push the boundaries of what's possible, embracing new technologies and approaches to deliver cutting-edge solutions."
                icon="Lightbulb"
                gradient="from-purple-600 to-blue-600"
              />
              <ValueCard
                title="Quality"
                description="We're obsessed with quality, from the components we select to the meticulous assembly of each system."
                icon="Shield"
                gradient="from-blue-600 to-cyan-600"
              />
              <ValueCard
                title="Reliability"
                description="We design systems that perform consistently under pressure, whether for gaming marathons or mission-critical business applications."
                icon="Server"
                gradient="from-cyan-600 to-teal-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline
      <section className="py-20 relative bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-none px-3 py-1">
              Our Journey
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              From Startup to{' '}
              <span className="text-blue-500">Industry Leader</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              What started as a passion project has grown into a global leader
              in high-performance computing for both gaming and enterprise.
              Here's how our journey unfolded.
            </p>
          </div>

          <CompanyTimeline />
        </div>
      </section> */}

      {/* Team Section */}
      <section className="py-20 mx-auto">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-3 py-1">
              Our Team
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Meet the <span className="text-blue-500">Visionaries</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              Tech Paradise is powered by a diverse team of passionate experts,
              each bringing unique skills and perspectives to our mission.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <TeamMember
              name="Alex Chen"
              role="Founder & CEO"
              bio="Former tech entrepreneur with a vision to create the ultimate computing hardware for all industries."
              image="/placeholder.svg?height=400&width=400"
              gradient="from-purple-600 to-blue-600"
            />
            <TeamMember
              name="Sophia Rodriguez"
              role="CTO"
              bio="Hardware engineering genius with 15+ patents in cooling technology and system architecture."
              image="/placeholder.svg?height=400&width=400"
              gradient="from-blue-600 to-cyan-600"
            />
            <TeamMember
              name="Marcus Johnson"
              role="Head of Gaming Division"
              bio="Former esports champion turned product designer, focused on creating the ultimate gaming experience."
              image="/placeholder.svg?height=400&width=400"
              gradient="from-cyan-600 to-teal-600"
            />
            <TeamMember
              name="Aisha Patel"
              role="Head of Enterprise Solutions"
              bio="Enterprise IT veteran with 15 years of experience developing solutions for Fortune 500 companies."
              image="/placeholder.svg?height=400&width=400"
              gradient="from-teal-600 to-green-600"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-400 mb-6">
              Our team extends beyond these leaders to include dozens of
              passionate engineers, designers, support specialists, and industry
              experts across both gaming and enterprise divisions.
            </p>
            <Link href="/careers">
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800"
              >
                Join Our Team <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 relative bg-zinc-950 mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border-none px-3 py-1">
              Our Solutions
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Tailored for <span className="text-cyan-500">Every Need</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              From high-performance gaming rigs to enterprise-grade workstations
              and servers, we create custom solutions for every computing
              challenge.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative rounded-lg overflow-hidden group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Tech Paradise Gaming Systems"
                  className="rounded-lg w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Gaming Systems</h3>
                    <p className="text-zinc-300">
                      Custom-built high-performance gaming PCs designed for
                      enthusiasts, streamers, and esports professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Tech Paradise Enterprise Solutions"
                  className="rounded-lg w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      Enterprise Solutions
                    </h3>
                    <p className="text-zinc-300">
                      High-performance workstations, servers, and infrastructure
                      solutions for businesses of all sizes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="text-4xl font-bold text-purple-500 mb-2">
                15,000+
              </div>
              <p className="text-zinc-400">
                Systems built and shipped annually
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
              <p className="text-zinc-400">Enterprise clients worldwide</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="text-4xl font-bold text-cyan-500 mb-2">99.8%</div>
              <p className="text-zinc-400">Quality assurance pass rate</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="text-4xl font-bold text-teal-500 mb-2">24/7</div>
              <p className="text-zinc-400">Support and monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 mx-auto">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-none px-3 py-1">
              Our Facilities
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Where <span className="text-purple-500">Innovation</span> Happens
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              Our state-of-the-art facilities combine cutting-edge technology
              with meticulous craftsmanship to create the world's finest
              computing systems.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative rounded-lg overflow-hidden group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Tech Paradise Manufacturing Facility"
                  className="rounded-lg w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      Manufacturing Excellence
                    </h3>
                    <p className="text-zinc-300">
                      Our precision manufacturing facility combines automated
                      efficiency with artisanal attention to detail.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden group  mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Tech Paradise R&D Lab"
                  className="rounded-lg w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      R&D Innovation Lab
                    </h3>
                    <p className="text-zinc-300">
                      Where tomorrow's breakthroughs are born, our R&D team
                      pushes the boundaries of what's possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden group mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Tech Paradise Enterprise Solutions Center"
                  className="rounded-lg w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      Enterprise Solutions Center
                    </h3>
                    <p className="text-zinc-300">
                      Our dedicated facility for corporate clients, offering
                      consultation, testing, and deployment services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative bg-zinc-950 mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-3 py-1">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Trusted by <span className="text-blue-500">Professionals</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              From esports champions to Fortune 500 companies, professionals
              across industries trust Tech Paradise to power their digital
              experiences.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  'My Tech Paradise PC has been the backbone of my streaming career. The performance is unmatched, and the support team is always there when I need them.',
                author: 'StreamerPro92',
                title: 'Twitch Partner, 1.2M Followers',
                image: '/placeholder.svg?height=100&width=100',
                gradient: 'from-purple-600 to-blue-600',
              },
              {
                quote:
                  "Tech Paradise's enterprise solutions have transformed our design department's workflow. Rendering times cut in half, and the reliability is exceptional.",
                author: 'Sarah Johnson',
                title: 'CTO, Architectural Innovations Inc.',
                image: '/placeholder.svg?height=100&width=100',
                gradient: 'from-blue-600 to-cyan-600',
              },
              {
                quote:
                  'When we needed to upgrade our data processing infrastructure, Tech Paradise delivered a custom solution that exceeded our performance requirements while staying within budget.',
                author: 'Michael Chang',
                title: 'IT Director, Global Finance Corp',
                image: '/placeholder.svg?height=100&width=100',
                gradient: 'from-cyan-600 to-teal-600',
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 border-zinc-800 overflow-hidden"
              >
                <div
                  className={`h-2 w-full bg-gradient-to-r ${testimonial.gradient}`}
                ></div>
                <CardContent className="p-6">
                  <p className="text-zinc-300 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image || '/placeholder.svg'}
                      width={50}
                      height={50}
                      alt={testimonial.author}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-zinc-400">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to Experience the Difference?
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Whether you're a gamer seeking the ultimate experience or a
                business looking for reliable, high-performance solutions, Tech
                Paradise has the perfect system for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Gaming Solutions
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Enterprise Solutions
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
