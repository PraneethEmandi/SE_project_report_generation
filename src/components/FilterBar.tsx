
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  filters: {
    label: string;
    options: string[];
  }[];
}

const FilterBar = ({ filters }: FilterBarProps) => {
  return (
    <div className="flex items-center space-x-3 my-4">
      {filters.map((filter, index) => (
        <Select key={index}>
          <SelectTrigger className="w-[180px] bg-gray-200">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option, idx) => (
              <SelectItem key={idx} value={option.toLowerCase().replace(/\s+/g, '-')}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      <Button className="bg-gray-700 hover:bg-gray-800">GO</Button>
    </div>
  );
};

export default FilterBar;
