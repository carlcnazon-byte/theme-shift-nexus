'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxis,
  LinearXAxisTickSeries,
  BarSeries,
  Bar,
  GridlineSeries,
  Gridline,
} from 'reaviz';
import { motion } from 'framer-motion';

interface VendorPerformanceData {
  vendor: string;
  jobs: number;
  rating: number;
}

interface VendorPerformanceChartProps {
  data: VendorPerformanceData[];
}

// Chart configuration
const chartColors = ['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF'];

export const VendorPerformanceChart: React.FC<VendorPerformanceChartProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState('last-30-days');

  // Sort data by jobs completed (descending) and take top 8, then format for reaviz
  const chartData = useMemo(() => {
    const sortedData = [...data]
      .sort((a, b) => b.jobs - a.jobs)
      .slice(0, 8)
      .map(vendor => ({
        key: vendor.vendor.length > 15 ? `${vendor.vendor.substring(0, 12)}...` : vendor.vendor,
        data: vendor.jobs,
        originalData: vendor
      }));
    
    return sortedData;
  }, [data, timeRange]);

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
  };

  // Calculate summary metrics
  const totalVendors = data.length;
  const totalJobs = data.reduce((sum, vendor) => sum + vendor.jobs, 0);
  const avgRating = data.reduce((sum, vendor) => sum + vendor.rating, 0) / data.length;
  const topPerformer = data.sort((a, b) => b.jobs - a.jobs)[0];

  const metrics = [
    {
      id: 'totalVendors',
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13.3333 5.83333C13.3333 7.67428 11.8409 9.16667 10 9.16667C8.15905 9.16667 6.66667 7.67428 6.66667 5.83333C6.66667 3.99238 8.15905 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333ZM3.33333 15.8333C3.33333 12.6117 5.94467 10 9.16667 10H10.8333C14.0553 10 16.6667 12.6117 16.6667 15.8333V17.5H3.33333V15.8333Z" fill="#4C86FF"/>
        </svg>
      ),
      label: 'Active Vendors',
      value: totalVendors.toString(),
      delay: 0,
    },
    {
      id: 'totalJobs',
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4.16667 4.16667C4.16667 3.24619 4.91286 2.5 5.83333 2.5H14.1667C15.0871 2.5 15.8333 3.24619 15.8333 4.16667V5.83333H16.6667C17.1269 5.83333 17.5 6.20643 17.5 6.66667C17.5 7.1269 17.1269 7.5 16.6667 7.5H15.8333V15.8333C15.8333 16.7538 15.0871 17.5 14.1667 17.5H5.83333C4.91286 17.5 4.16667 16.7538 4.16667 15.8333V7.5H3.33333C2.8731 7.5 2.5 7.1269 2.5 6.66667C2.5 6.20643 2.8731 5.83333 3.33333 5.83333H4.16667V4.16667ZM5.83333 7.5V15.8333H14.1667V7.5H5.83333ZM5.83333 4.16667V5.83333H14.1667V4.16667H5.83333Z" fill="#40E5D1"/>
        </svg>
      ),
      label: 'Total Jobs Completed',
      value: totalJobs.toString(),
      delay: 0.05,
    },
    {
      id: 'avgRating',
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 1.25L12.8167 6.91667L19.25 7.83333L14.625 12.3333L15.6333 18.75L10 15.7833L4.36667 18.75L5.375 12.3333L0.75 7.83333L7.18333 6.91667L10 1.25Z" fill="#9152EE"/>
        </svg>
      ),
      label: 'Average Rating',
      value: `${avgRating.toFixed(1)}/5.0`,
      delay: 0.1,
    },
  ];

  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-background dark:bg-background rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-full h-[714px] overflow-hidden transition-colors duration-300">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left font-bold text-foreground">
          Vendor Performance
        </h3>
        <select
          value={timeRange}
          onChange={handleTimeRangeChange}
          aria-label="Select time range for vendor performance"
          className="bg-muted text-foreground p-3 pt-2 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>

      <div className="flex-grow px-4 h-[200px]">
        <BarChart
          id="vendor-performance-horizontal-chart"
          height={200}
          data={chartData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text: string) => text}
                      fill="hsl(var(--muted-foreground))"
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  label={null}
                  line={null}
                  tickSize={10}
                />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={
                <Bar
                  glow={{
                    blur: 20,
                    opacity: 0.5,
                  }}
                  gradient={null}
                />
              }
              colorScheme={chartColors}
              padding={0.1}
            />
          }
          gridlines={
            <GridlineSeries
              line={<Gridline strokeColor="hsl(var(--muted))" />}
            />
          }
        />
      </div>

      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-muted-foreground">Top Performer</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-semibold text-foreground">
              {topPerformer?.vendor.substring(0, 15)}{topPerformer?.vendor.length > 15 ? '...' : ''}
            </span>
            <div className="flex bg-primary/40 p-1 pl-2 pr-2 items-center rounded-full text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 21" fill="none">
                <path d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
              </svg>
              {topPerformer?.jobs} jobs
            </div>
          </div>
          <span className="text-muted-foreground text-sm">
            Rating: {topPerformer?.rating}/5.0
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-muted-foreground">Total Jobs</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-semibold text-foreground">
              {totalJobs.toLocaleString()}
            </span>
            <div className="flex bg-accent/40 p-1 pl-2 pr-2 items-center rounded-full text-accent-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 21" fill="none">
                <path d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
              </svg>
              {chartData.length} vendors
            </div>
          </div>
          <span className="text-muted-foreground text-sm">
            Across all vendors
          </span>
        </div>
      </div>

      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-border">
        {metrics.map(metric => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: metric.delay }}
            className="flex w-full pb-4 pt-4 items-center gap-2"
          >
            <div className="flex flex-row gap-2 items-center text-base w-1/2 text-muted-foreground">
              {metric.iconSvg}
              <span className="truncate" title={metric.label}>
                {metric.label}
              </span>
            </div>
            <div className="flex gap-2 w-1/2 justify-end items-center">
              <span className="font-semibold text-xl text-foreground">{metric.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};