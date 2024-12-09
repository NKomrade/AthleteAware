import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserContext } from "../context/UserContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Book,
  Award,
  Download,
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  Activity,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const user = {
    name: "Athlete Conners",
    email: "conners.athlete@gmail.com",
    completedCourses: 2,
    totalCourses: 5,
    badges: ["Anti-Doping Novice", "Quiz Master", "Course Completer"],
    certifications: [
      "Introduction to Anti-Doping",
      "Therapeutic Use Exemptions",
    ],
    recentActivity: [
      {
        action: "Completed course",
        item: "Therapeutic Use Exemptions",
        date: new Date().toISOString().split("T")[0],
      },
      {
        action: "Earned badge",
        item: "Quiz Master",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        action: "Started course",
        item: "Doping Control Procedures",
        date: new Date(Date.now() - 48 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
    ],
    upcomingEvents: [
      { name: "Quarterly Anti-Doping Test", date: "2024-11-01" },
      { name: "Anti-Doping Webinar", date: "2024-12-15" },
      { name: "Annual Athlete Workshop", date: "2025-02-01" },
    ],
    personalBests: [
      { event: "100m Sprint", time: "10.05s", date: "2024-05-20" },
      { event: "Long Jump", distance: "8.15m", date: "2024-04-15" },
      { event: "Shot Put", distance: "21.50m", date: "2024-03-10" },
    ],
  };

  const handleDownload = (certName) => {
    // Simulating certificate download
    const blob = new Blob([`This is a certificate for ${certName}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certName.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show a toast notification
    toast({
      title: "Certificate Downloaded",
      description: `Your certificate for ${certName} has been downloaded.`,
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/ben-true-cortney-white-09525-1-1620856087.jpg?crop=0.960xw:0.641xh;0.0345xw,0.180xh&resize=1200:*"
                  className="h-24 w-24 rounded-full object-cover"
                  alt={user.name}
                />
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-2 flex space-x-2">
                    <Badge variant="secondary">Track and Field</Badge>
                    <Badge variant="secondary">Olympic Athlete</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Completed Courses</span>
                  <span className="text-sm font-medium">
                    {user.completedCourses}/{user.totalCourses}
                  </span>
                </div>
                <Progress
                  value={(user.completedCourses / user.totalCourses) * 100}
                />
                <p className="text-sm text-gray-600 mt-2">
                  Keep up the good work! Complete all courses to become an
                  Anti-Doping Expert.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-1 px-2"
                  >
                    <Award className="mr-1 h-4 w-4" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-2">
                {user.certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex flex-col bg-gray-100 p-4 rounded items-center"
                  >
                    <span className="flex items-center mb-2">
                      <Book className="mr-2 h-5 w-5" />
                      {cert}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(cert)}
                    >
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-4 md:grid-cols-3">
                {user.recentActivity.map((activity, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm bg-gray-100 p-3 rounded"
                  >
                    <Activity className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-semibold">{activity.action}</p>
                      <p>{activity.item}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {activity.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {user.upcomingEvents.map((event, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm bg-gray-100 p-3 rounded"
                  >
                    <Calendar className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="flex-grow">{event.name}</span>
                    <span className="text-gray-500">{event.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Bests</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {user.personalBests.map((pb, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm bg-gray-100 p-2 rounded"
                  >
                    <span className="flex items-center">
                      <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                      {pb.event}
                    </span>
                    <span className="font-semibold">
                      {pb.time || pb.distance}
                    </span>
                    <span className="text-gray-500 text-xs">{pb.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
