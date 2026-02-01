import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/data/mockData";
import {
  Download,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const weeklyData = [
  { day: "Mon", hours: 4, topics: 3 },
  { day: "Tue", hours: 5, topics: 4 },
  { day: "Wed", hours: 3, topics: 2 },
  { day: "Thu", hours: 6, topics: 5 },
  { day: "Fri", hours: 4, topics: 3 },
  { day: "Sat", hours: 2, topics: 2 },
  { day: "Sun", hours: 5, topics: 4 },
];

const topicStatusData = [
  { name: "Revised", value: 12, color: "hsl(142, 71%, 45%)" },
  { name: "Learning", value: 6, color: "hsl(45, 93%, 47%)" },
  { name: "New", value: 4, color: "hsl(217, 91%, 60%)" },
];

const progressTrend = [
  { week: "W1", progress: 20 },
  { week: "W2", progress: 35 },
  { week: "W3", progress: 48 },
  { week: "W4", progress: 65 },
];

export default function Reports() {
  const totalHours = weeklyData.reduce((acc, d) => acc + d.hours, 0);
  const totalTopics = weeklyData.reduce((acc, d) => acc + d.topics, 0);
  const avgHoursPerDay = (totalHours / 7).toFixed(1);

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download would be triggered here!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Track your study progress and performance
          </p>
        </div>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download Report</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalHours}h</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <BookOpen className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalTopics}</div>
              <div className="text-xs text-muted-foreground">Topics Covered</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold">{avgHoursPerDay}h</div>
              <div className="text-xs text-muted-foreground">Daily Average</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/10">
              <CheckCircle2 className="w-5 h-5 text-info" />
            </div>
            <div>
              <div className="text-2xl font-bold">85%</div>
              <div className="text-xs text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Study Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Topic Status Distribution */}
        <Card className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <CardHeader>
            <CardTitle className="text-lg">Topic Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {topicStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {topicStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Trend */}
      <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
        <CardHeader>
          <CardTitle className="text-lg">Overall Progress Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Progress */}
      <Card className="animate-fade-in" style={{ animationDelay: "350ms" }}>
        <CardHeader>
          <CardTitle className="text-lg">Subject Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjects.map((subject, index) => (
            <div
              key={subject.id}
              className="space-y-2 animate-slide-in-left"
              style={{ animationDelay: `${350 + index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="font-medium">{subject.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{subject.topics.length} topics</Badge>
                  <span className="font-semibold">{subject.progress}%</span>
                </div>
              </div>
              <Progress value={subject.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
