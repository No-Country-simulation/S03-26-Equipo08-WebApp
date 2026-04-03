export const getTestimonios = (status) => {
  const data = JSON.parse(localStorage.getItem("testimonios")) || [];

  if (status) {
    return data.filter(t => t.estado === status);
  }

  return data;
};