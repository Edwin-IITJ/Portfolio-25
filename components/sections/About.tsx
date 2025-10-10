'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, Award, Briefcase, GraduationCap } from 'lucide-react'
import Button from '../ui/Button'

const About = () => {
  const skills = [
    {
      category: 'Design & HCI Tools: ',
      icon: Award,
      items: ['Figma', 'Photoshop', 'Unity', 'Unreal Engine 5', 'Procreate', 'DaVinci Resolve']
    },
    {
      category: 'Frameworks & Libraries',
      icon: Award,
      items: ['Angular', 'ASP.NET', 'Pandas']
    },
    {
      category: 'Programming',
      icon: Briefcase,
      items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C#']
    },
    {
      category: 'Web Skills',
      icon: GraduationCap,
      items: ['HTML', 'CSS', 'Bootstrap']
    },
    {
      category: 'Other',
      icon: GraduationCap,
      items: ['Microsoft SQL Server', 'Microsoft Excel']
    },
  ]

  const stats = [
    { number: '3+', label: 'Years Experience' },
    // { number: '20+', label: 'Projects Completed' },
    { number: '15+', label: 'Licenses & Certifications' },
    // { number: '5+', label: 'Awards Won' },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="Edwin Meleth"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/600x600/2563eb/ffffff?text=EM'
                }}
              />
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-100 rounded-full blur-2xl opacity-70" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent-100 rounded-full blur-2xl opacity-70" />
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md text-center"
                >
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About Me
            </h2>

            <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              <p>
                I'm a passionate <span className="font-semibold text-gray-900">UI/UX Designer</span> and{' '}
                <span className="font-semibold text-gray-900">Creative Developer</span> currently pursuing my studies
                at <span className="font-semibold text-primary-600">IIT Jodhpur</span>, specializing in creating
                immersive digital experiences that bridge the gap between design and technology.
              </p>

              <p>
                My work focuses on <span className="font-semibold text-gray-900">VR/AR applications</span>,
                usability engineering, and innovative web experiences. I believe in user-centered design
                principles and love exploring how emerging technologies can solve real-world problems.
              </p>

              <p>
                Previously, I worked as a full-stack developer for over 2 years at IQVIA contributing to the Supply Integrity Management System (SiMS) using Angular, ASP.NET, and SQL. My responsibilities included designing and developing new user interfaces, writing SQL stored procedures to meet project requirements, and handling web application deployment on IIS, as well as SP deployment on SQL Server, hosted in Azure virtual machines.
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-6">Skills & Expertise</h3>
              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <skillGroup.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/Resume_EdwinMeleth.pdf" target="_blank" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" href="#contact">
                Let's Connect
              </Button>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
