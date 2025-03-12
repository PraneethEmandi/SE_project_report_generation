
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QueryBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setQuery(text);
    setCharCount(text.length);
  };
  // const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const text = e.target.value;
  //   setQuery(text);
  //   setCharCount(text.length);
  // };
  
  const handleRunQuery = () => {
    if (query.trim() === '') {
      toast({
        title: "Empty Query",
        description: "Please enter a query to run.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the query to a backend
    // For demo purposes, we'll just navigate to the results page
    navigate('/query-results');
  };

  return (
    <DashboardLayout title="Build Your Query">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-8">
            <label className="block text-xl font-medium text-gray-700 mb-4">
              What can I help with?
            </label>
            <Textarea
              placeholder="e.g. Students with GPA greater than 8.0"
              className="min-h-[150px] text-base"
              value={query}
              onChange={handleQueryChange}
            />
            <div className="flex justify-end mt-2 text-sm text-gray-500">
              {charCount}/50
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleRunQuery}
              className="w-40 bg-black hover:bg-gray-800 flex items-center justify-center"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" /> Run Query
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QueryBuilder;
