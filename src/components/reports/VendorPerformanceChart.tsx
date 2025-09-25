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

interface VendorPerformanceData {
  vendor: string;
  jobs: number;
  rating: number;
}

interface VendorPerformanceChartProps {
  data: VendorPerformanceData[];
}

// Diverse color scheme for better distinction
const chartColors = [
  '#14b8a6', // Teal
  '#8b5cf6', // Purple
  '#f59e0b', // Amber
  '#06b6d4', // Cyan
  '#ef4444', // Red
  '#10b981', // Emerald
  '#f97316', // Orange
  '#6366f1', // Indigo
];

export const VendorPerformanceChart: React.FC<VendorPerformanceChartProps> = ({ data }) => {
  // Sort data by jobs completed (descending) and take top 8, then format for reaviz
  const chartData = useMemo(() => {
    const sortedData = [...data]
      .sort((a, b) => b.jobs - a.jobs)
      .slice(0, 8)
      .map((vendor, index) => ({
        key: vendor.vendor.length > 15 ? `${vendor.vendor.substring(0, 12)}...` : vendor.vendor,
        data: vendor.jobs,
        originalData: vendor,
        color: chartColors[index % chartColors.length]
      }));
    
    return sortedData;
  }, [data]);

  const formatVendorName = (name: string) => {
    return name.length > 20 ? `${name.substring(0, 17)}...` : name;
  };

  return (
    <div className="h-80">
      <BarChart
        id="vendor-performance-horizontal-chart"
        height={320}
        data={chartData}
        yAxis={
          <LinearYAxis
            type="category"
            tickSeries={
              <LinearYAxisTickSeries
                label={
                  <LinearYAxisTickLabel
                    format={(text: string) => formatVendorName(text)}
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
                  blur: 8,
                  opacity: 0.3,
                }}
                gradient={null}
                rx={4}
              />
            }
            colorScheme={chartColors}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries
            line={<Gridline strokeColor="hsl(var(--border))" />}
          />
        }
      />
    </div>
  );
};