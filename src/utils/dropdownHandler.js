// Dropdown functionality for program features
export const initDropdowns = () => {
  const dropdownHeaders = document.querySelectorAll('.dropdown-header');
  const featureLines = document.querySelectorAll('.feature-line');
  
  dropdownHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const dropdownFeature = header.parentElement;
      
      // Toggle current dropdown independently
      dropdownFeature.classList.toggle('active');
    });
  });
  
  featureLines.forEach(line => {
    line.addEventListener('click', () => {
      const featureDropdown = line.parentElement;
      
      // Toggle current dropdown independently
      featureDropdown.classList.toggle('active');
    });
  });
};