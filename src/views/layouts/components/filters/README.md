# DataFilters Component - Usage Guide

A reusable, flexible filter component for data tables and lists across the platform.

## Features

- **Search Input**: Full-text search with customizable placeholder
- **Filter Groups**: Multiple filter categories with active state
- **Action Buttons**: Export, More Filters, and custom actions
- **Responsive**: Mobile-friendly layout
- **Consistent Styling**: Matches platform design (orange theme)
- **Option Counts**: Display counts next to filter options

## Basic Usage

```jsx
import DataFilters from "@/views/layouts/components/filters/DataFilters";

function MyPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filterGroups = [
    {
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "All", label: "All" },
        { value: "Active", label: "Active", count: 10 },
        { value: "Pending", label: "Pending", count: 5 },
      ],
    },
    {
      label: "Category",
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: [
        { value: "All", label: "All" },
        { value: "Tech", label: "Technology" },
        { value: "Health", label: "Healthcare" },
      ],
    },
  ];

  return (
    <DataFilters
      searchQuery={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search items..."
      filterGroups={filterGroups}
      showExport={true}
      onExport={() => console.log("Export clicked")}
    />
  );
}
```

## Props

### searchQuery
- **Type**: `string`
- **Default**: `""`
- **Description**: Current search query value

### onSearchChange
- **Type**: `function(value: string)`
- **Required**: Yes (if you want search functionality)
- **Description**: Callback when search input changes

### searchPlaceholder
- **Type**: `string`
- **Default**: `"Search..."`
- **Description**: Placeholder text for search input

### filterGroups
- **Type**: `Array<FilterGroup>`
- **Default**: `[]`
- **Description**: Array of filter group configurations

**FilterGroup Structure**:
```typescript
{
  label: string;           // Display label (e.g., "Status")
  value: string;           // Current selected value
  onChange: (value) => void; // Callback when option selected
  options: Array<{
    value: string;         // Option value
    label: string;         // Display label
    count?: number;        // Optional count badge
  }>;
}
```

### showExport
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to show the export button

### onExport
- **Type**: `function()`
- **Description**: Callback when export button is clicked

### showMoreFilters
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to show "More Filters" button

### onMoreFilters
- **Type**: `function()`
- **Description**: Callback when "More Filters" is clicked

### customActions
- **Type**: `React.ReactNode`
- **Description**: Custom action buttons to display before Export/More Filters

## Examples

### Example 1: With Custom Actions

```jsx
<DataFilters
  searchQuery={search}
  onSearchChange={setSearch}
  filterGroups={filterGroups}
  customActions={
    <>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Add New
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg">
        Import
      </button>
    </>
  }
  showExport={true}
  onExport={handleExport}
/>
```

### Example 2: Search Only (No Filters)

```jsx
<DataFilters
  searchQuery={search}
  onSearchChange={setSearch}
  searchPlaceholder="Search by name, email, or ID..."
  showExport={false}
/>
```

### Example 3: Filters Only (No Search)

```jsx
<DataFilters
  filterGroups={filterGroups}
  showExport={true}
  onExport={handleExport}
/>
```

### Example 4: Complete Example with Counts

```jsx
const stats = {
  total: data.length,
  active: data.filter(d => d.status === 'Active').length,
  pending: data.filter(d => d.status === 'Pending').length,
};

const filterGroups = [
  {
    label: "Status",
    value: statusFilter,
    onChange: setStatusFilter,
    options: [
      { value: "All", label: "All", count: stats.total },
      { value: "Active", label: "Active", count: stats.active },
      { value: "Pending", label: "Pending", count: stats.pending },
    ],
  },
  {
    label: "Date Range",
    value: dateFilter,
    onChange: setDateFilter,
    options: [
      { value: "All", label: "All Time" },
      { value: "Today", label: "Today" },
      { value: "Week", label: "This Week" },
      { value: "Month", label: "This Month" },
    ],
  },
];

<DataFilters
  searchQuery={search}
  onSearchChange={setSearch}
  searchPlaceholder="Search transactions..."
  filterGroups={filterGroups}
  showExport={true}
  onExport={() => exportData(filteredData)}
  showMoreFilters={true}
  onMoreFilters={() => setShowAdvancedFilters(true)}
/>
```

## Styling

The component uses Tailwind CSS classes and follows the platform's design system:
- **Primary Color**: Orange (#FF6B35)
- **Border Radius**: 8px (lg)
- **Spacing**: Consistent padding and gaps
- **Hover States**: Smooth transitions on all interactive elements

## Integration with Data Tables

Use with the existing `DataTable` component:

```jsx
import DataFilters from "@/views/layouts/components/filters/DataFilters";
import DataTable from "@/views/layouts/components/tables/DataTable";

function DataPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter data based on search and filters
  const filteredData = data.filter(item => {
    const matchesSearch = search === "" || 
      item.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || 
      item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div>
      <DataFilters
        searchQuery={search}
        onSearchChange={setSearch}
        filterGroups={filterGroups}
        showExport={true}
        onExport={() => exportToCSV(filteredData)}
      />
      
      <div className="mt-6">
        <DataTable
          data={filteredData}
          columns={columns}
          pagination={true}
        />
      </div>
    </div>
  );
}
```

## Best Practices

1. **Keep filter groups concise**: Don't overwhelm users with too many filters at once
2. **Show counts when relevant**: Helps users understand data distribution
3. **Use meaningful labels**: Clear, concise filter group and option labels
4. **Implement search debouncing**: For better performance with large datasets
5. **Persist filter state**: Consider using URL params or local storage
6. **Provide clear feedback**: Use toast notifications for export actions

## Accessibility

- All buttons are keyboard accessible
- Proper focus states on all interactive elements
- Semantic HTML structure
- Screen reader friendly labels

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers
