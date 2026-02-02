"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin, Upload, X, ArrowLeft, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminCreateEventPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: '',
        capacity: '',
        organizer: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !date || !formData.location) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Event created successfully!");
            router.push('/dashboard/admin/events');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full hover:bg-slate-100"
                >
                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create New Event</h1>
                    <p className="text-slate-500">Schedule a property showcase, open house, or workshop.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Main Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                            <CardDescription>Basic information about the event.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title <span className="text-red-500">*</span></Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Luxury Villa Open House"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="What is this event about?"
                                    className="min-h-[120px]"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="organizer">Organizer / Host</Label>
                                <Input
                                    id="organizer"
                                    placeholder="e.g., PropertyCab Team or Agent Name"
                                    value={formData.organizer}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle>Date & Location</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 flex flex-col">
                                    <Label>Date <span className="text-red-500">*</span></Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal border-slate-200",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startTime">Start Time</Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="startTime"
                                                type="time"
                                                className="pl-9"
                                                value={formData.startTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endTime">End Time</Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="endTime"
                                                type="time"
                                                className="pl-9"
                                                value={formData.endTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location / Venue <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="location"
                                        placeholder="e.g., Grand Ballroom, City Center"
                                        className="pl-9"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Media & Settings */}
                <div className="space-y-6">
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader>
                            <CardTitle>Event Image</CardTitle>
                            <CardDescription>Upload a cover image for the event card.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="relative aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer overflow-hidden group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {previewImage ? (
                                    <>
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-medium flex items-center gap-2">
                                                <ImageIcon className="w-5 h-5" /> Change Image
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                            <Upload className="w-6 h-6 text-slate-600" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-600">Click to upload</p>
                                        <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            {previewImage && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewImage(null);
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                >
                                    <X className="w-4 h-4 mr-2" /> Remove Image
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="capacity">Total Capacity</Label>
                                <Input
                                    id="capacity"
                                    type="number"
                                    placeholder="e.g., 100"
                                    value={formData.capacity}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t border-slate-100 bg-slate-50/50">
                            <Button
                                className="w-full bg-slate-900 text-white hover:bg-slate-800"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    "Creating..."
                                ) : (
                                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Publish Event</>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
}
