"use state"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CollegesForm() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    established_year: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New College</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">College Name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter college name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              value={form.location}
              onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter location (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Established Year</label>
            <Input
              type="number"
              value={form.established_year}
              onChange={(e) => setForm(prev => ({ ...prev, established_year: e.target.value }))}
              placeholder="Enter established year (optional)"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add College'}
          </Button>
          {message && (
            <div className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}