"use client";

import React, { useEffect } from "react";
import { AnalysisData } from "../types";

interface AnalysisProps {
  data: AnalysisData;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Analysis: React.FC<AnalysisProps> = ({ data, isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  const {
    CurrentMetrics,
    IndustryAverages,
    Comparison,
    PricingStrategiesAnalysis,
    ComparisonwithAustralianMarket,
    RecommendedPricing,
  } = data;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {data && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="bg-white m-6 rounded-lg shadow-lg max-w-6xl w-full z-50 overflow-auto max-h-screen p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Analysis Results
            </h1>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Section title="Current Metrics" data={CurrentMetrics} />
                <Section title="Industry Averages" data={IndustryAverages} />
              </div>
              <Section title="Comparison" data={Comparison} />
              <TextSection
                title="Pricing Strategies Analysis"
                data={PricingStrategiesAnalysis}
              />
              <Section
                title="Comparison with Australian Market"
                data={ComparisonwithAustralianMarket}
              />
              <TextSection
                title="Recommended Pricing"
                data={RecommendedPricing}
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Section: React.FC<{ title: string; data: any }> = ({ title, data }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-8 border">
      <thead className="bg-gray-100">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Metric
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Value
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data &&
          Object.entries(data).map(([key, value]) => (
            <tr key={key} className="">
              <td className="px-2 py-2 font-medium text-gray-900 border-r">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </td>
              <td className="py-2 px-2">
                {typeof value === "object" && value !== null ? (
                  <NestedObjectRenderer data={value} />
                ) : (
                  (value as React.ReactNode)
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const NestedObjectRenderer: React.FC<{ data: any }> = ({ data }) => (
  <div className="mt-2 border-gray-300">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-8">
      <tbody className="divide-y divide-gray-200">
        {data &&
          Object.entries(data).map(([key, value]) => (
            <tr key={key} className="">
              <td className="py-2 font-medium text-gray-900 px-2 border-r">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </td>
              <td className="py-2 pl-2">
                {typeof value === "object" && value !== null ? (
                  <NestedObjectRenderer data={value} />
                ) : (
                  (value as React.ReactNode)
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const TextSection: React.FC<{ title: string; data: any }> = ({
  title,
  data,
}) => (
  <div>
    <h2 className="heading-text mb-2">{title}</h2>
    <div className="space-y-4">
      {data &&
        Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h3 className="font-semibold text-2xl">
              - {key.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            {typeof value === "object" && value !== null ? (
              <TextNestedObjectRenderer data={value} />
            ) : (
              <p className="pl-4 text-md">{value as React.ReactNode}</p>
            )}
          </div>
        ))}
    </div>
  </div>
);

const TextNestedObjectRenderer: React.FC<{ data: any }> = ({ data }) => (
  <div className="pl-4  border-gray-300 ml-4">
    {data &&
      Object.entries(data).map(([key, value]) => (
        <div key={key} className="py-1">
          <h4 className="font-medium text-xl">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </h4>
          {typeof value === "object" && value !== null ? (
            <TextNestedObjectRenderer data={value} />
          ) : (
            <p className="pl-4 text-md">{value as React.ReactNode}</p>
          )}
        </div>
      ))}
  </div>
);

export default Analysis;
