import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const leaderboardData = [
  { rank: 1, username: "RahulSharma", score: 980, region: "Delhi", sport: "Cricket" },
  { rank: 2, username: "PriyaPatel", score: 950, region: "Gujarat", sport: "Athletics" },
  { rank: 3, username: "VikasKumar", score: 920, region: "Uttar Pradesh", sport: "Badminton" },
  { rank: 4, username: "AnjaliSingh", score: 900, region: "Punjab", sport: "Weightlifting" },
  { rank: 5, username: "ArjunReddy", score: 880, region: "Andhra Pradesh", sport: "Tennis" },
  { rank: 6, username: "NeerajChopra", score: 860, region: "Haryana", sport: "Javelin" },
  { rank: 7, username: "RohanBopanna", score: 810, region: "Haryana", sport: "Tennis" },
  { rank: 8, username: "ManikaBatra", score: 790, region: "Delhi", sport: "TableTennis" },
  { rank: 9, username: "ArjanErigaisi", score: 780, region: "Telangana", sport: "Chess" },
  { rank: 10, username: "ChiragShetty", score: 670, region: "Haryana", sport: "Badminton" },
];


export default function LeaderboardPage() {
  return (
    <div className="flex flex-col min-h-screen mx-9">
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        <div className="flex justify-end space-x-4 mb-6">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="oceania">Oceania</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="swimming">Swimming</SelectItem>
              <SelectItem value="athletics">Athletics</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
              <SelectItem value="gymnastics">Gymnastics</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Sport</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-medium">{entry.rank}</TableCell>
                <TableCell>{entry.username}</TableCell>
                <TableCell>{entry.score}</TableCell>
                <TableCell>{entry.region}</TableCell>
                <TableCell>{entry.sport}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

    </div>
  )
}