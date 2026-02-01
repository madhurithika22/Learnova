import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { todaySchedule } from "@/data/mockData";
import {
  Clock,
  Brain,
  Coffee,
  RefreshCw,
  Target,
  Save,
  Sparkles,
  Heart,
  AlertCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function ScheduleBlock({
  block,
  index,
}: {
  block: typeof todaySchedule[0];
  index: number;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const typeStyles = {
    study: {
      bg: "bg-info/10 border-info/30",
      icon: Brain,
      iconBg: "bg-info/20 text-info",
    },
    revision: {
      bg: "bg-warning/10 border-warning/30",
      icon: RefreshCw,
      iconBg: "bg-warning/20 text-warning",
    },
    break: {
      bg: "bg-success/10 border-success/30",
      icon: Coffee,
      iconBg: "bg-success/20 text-success",
    },
    review: {
      bg: "bg-primary/10 border-primary/30",
      icon: Target,
      iconBg: "bg-primary/20 text-primary",
    },
  };

  const priorityBadges = {
    high: "bg-urgent/10 text-urgent border-urgent/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-muted text-muted-foreground",
  };

  const style = typeStyles[block.type];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg animate-slide-in-left",
        style.bg
      )}
      style={{ animationDelay: `${200 + index * 80}ms` }}
    >
      {/* Time indicator line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-current opacity-50" />

      <div className="flex items-start gap-4">
        {/* Time */}
        <div className="text-center min-w-[60px]">
          <div className="text-sm font-bold">{block.startTime}</div>
          <div className="text-xs text-muted-foreground">to</div>
          <div className="text-sm font-bold">{block.endTime}</div>
        </div>

        {/* Icon */}
        <div className={cn("p-3 rounded-xl", style.iconBg)}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold">{block.topicName}</h4>
              {block.subjectName && (
                <p className="text-sm text-muted-foreground">{block.subjectName}</p>
              )}
            </div>
            {block.type !== "break" && (
              <Badge variant="outline" className={priorityBadges[block.priority]}>
                {block.priority}
              </Badge>
            )}
          </div>

          {/* AI Reason Tooltip */}
          {block.type !== "break" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Sparkles className="w-3 h-3" />
                  Why this timing?
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 mt-0.5 text-primary" />
                  <p className="text-sm">{block.aiReason}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SmartSchedule() {
  const [showPreferences, setShowPreferences] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [preferences, setPreferences] = useState({
    startTime: "17:00",
    endTime: "22:00",
    breakDuration: "30",
    lunchTime: "19:00",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Smart Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Your AI-optimized study plan for today
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowPreferences(!showPreferences)} className="gap-2">
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">Preferences</span>
        </Button>
      </div>

      {/* Preferences Panel */}
      {showPreferences && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="text-lg">Study Preferences</CardTitle>
            <CardDescription>
              Set your availability and the AI will optimize around it
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Study Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={preferences.startTime}
                  onChange={(e) => setPreferences({ ...preferences, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time (optional)</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={preferences.endTime}
                  onChange={(e) => setPreferences({ ...preferences, endTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lunchTime">Break/Lunch Time (optional)</Label>
                <Input
                  id="lunchTime"
                  type="time"
                  value={preferences.lunchTime}
                  onChange={(e) => setPreferences({ ...preferences, lunchTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breakDuration">Break Duration</Label>
                <Select
                  value={preferences.breakDuration}
                  onValueChange={(value) => setPreferences({ ...preferences, breakDuration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      )}

      {/* AI Info Card */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent animate-fade-in" style={{ animationDelay: "100ms" }}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Your schedule is optimized for maximum retention</p>
            <p className="text-sm text-muted-foreground">
              Harder topics during peak focus • Revisions spaced for memory • Breaks for recovery
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg animate-fade-in" style={{ animationDelay: "150ms" }}>
          Today's Timeline
        </h2>
        <div className="space-y-3">
          {todaySchedule.map((block, index) => (
            <ScheduleBlock key={block.id} block={block} index={index} />
          ))}
        </div>
      </div>

      {/* Adjust Button */}
      <Card
        className="cursor-pointer card-hover animate-fade-in"
        style={{ animationDelay: "500ms" }}
        onClick={() => setShowAIModal(true)}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Need to adjust the schedule?</p>
              <p className="text-sm text-muted-foreground">
                Click here to request changes
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </CardContent>
      </Card>

      {/* AI Empathetic Modal */}
      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              I understand 💜
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-3 pt-2">
                <p>
                  Taking breaks is important for your wellbeing. But finishing this today means less stress tomorrow.
                </p>
                <p className="text-muted-foreground">
                  You can relax more after exams. Let's find a balance that works for you.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowAIModal(false)} className="flex-1">
              Continue Plan
            </Button>
            <Button variant="secondary" onClick={() => setShowAIModal(false)} className="flex-1">
              Slightly Adjust
            </Button>
            <Button variant="ghost" onClick={() => setShowAIModal(false)} className="flex-1">
              I Need Rest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
