import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, GraduationCap, Award, Users, FileText, Settings, HelpCircle, LogOut, Search, TrendingUp, Trophy, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardLayout() {
  const activityData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 3 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 2 },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-white border-r fixed h-full overflow-y-auto">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-6 w-6" />
              <span className="text-xl font-bold">AthleteAware</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 bg-primary text-primary-foreground rounded-md"
              >
                <BarChart className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/courses"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <GraduationCap className="h-5 w-5" />
                <span>Courses</span>
              </Link>
              <Link
                to="/achievements"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </Link>
              <Link
                to="/community"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Users className="h-5 w-5" />
                <span>Community</span>
              </Link>
              <Link
                to="/resources"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FileText className="h-5 w-5" />
                <span>Resources</span>
              </Link>
            </div>

            <div className="mt-auto pt-4 space-y-1">
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Link
                to="/help"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <HelpCircle className="h-5 w-5" />
                <span>How to use?</span>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </Button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center flex-1">
              <div className="w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://i.pinimg.com/736x/d0/a2/e2/d0a2e243610bde1be54defdca162e47a.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">James Anderson</p>
                <p className="text-xs text-muted-foreground">Cricketer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Metrics */}
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="rounded-full p-3 bg-blue-100">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                  <h3 className="text-2xl font-bold">3</h3>
                  <p className="text-sm text-green-600">+2 from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="rounded-full p-3 bg-green-100">
                  <Award className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Certifications</p>
                  <h3 className="text-2xl font-bold">5</h3>
                  <p className="text-sm text-green-600">+1 this week</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="rounded-full p-3 bg-purple-100">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Course Progress</p>
                  <h3 className="text-2xl font-bold">75%</h3>
                  <p className="text-sm text-green-600">+5% this week</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Chart */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Learning Activity</h2>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity and Calendar */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Activity className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Completed "Anti-Doping Basics" quiz</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Earned "Clean Sport" badge</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 mr-2 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Started "Advanced Anti-Doping" course</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Anti-Doping Webinar</p>
                      <p className="text-xs text-muted-foreground">Nov 25, 2024 - 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Quarterly Assessment</p>
                      <p className="text-xs text-muted-foreground">Dec 1, 2024 - 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}