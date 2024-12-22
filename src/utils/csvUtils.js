import Papa from "papaparse";

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

export const findBestContainers = (csvData, dimensions) => {
  const { length, width, height } = dimensions;

  // Filter containers with L, W, H <= given dimensions
  const validContainers = csvData.filter((row) => {
    return (
      parseInt(row.LENGTH) <= length &&
      parseInt(row.WIDTH) <= width &&
      parseInt(row.HEIGHT) <= height
    );
  });

  // Calculate utilization percentage
  validContainers.forEach((container) => {
    const containerVolume =
      parseInt(container.LENGTH) *
      parseInt(container.WIDTH) *
      parseInt(container.HEIGHT);

    const boxVolume = length * width * height;

    container.utilization = (boxVolume / containerVolume) * 100;
  });

  // Sort by utilization percentage (descending)
  validContainers.sort((a, b) => b.utilization - a.utilization);

  // Return top 3 containers
  return validContainers.slice(0, 3);
};
