export const solarHierarchy = {
  name: 'sun',
  children: [
    {
      name: 'mercury',
      moons: [],
    },
    {
      name: 'venus',
      moons: [],
    },
    {
      name: 'earth',
      moons: ['earth-moon'],
    },
    {
      name: 'mars',
      moons: ['mars-phobos', 'mars-deimos'],
    },
    {
      name: 'jupiter',
      moons: [
        'jupiter-io',
        'jupiter-europa',
        'jupiter-ganymede',
        'jupiter-callisto',
      ],
    },
    {
      name: 'saturn',
      moons: [
        'saturn-titan',
        'saturn-rhea',
        'saturn-iapetus',
        'saturn-dione',
        'saturn-tethys',
      ],
    },
    {
      name: 'uranus',
      moons: [
        'uranus-titania',
        'uranus-oberon',
        'uranus-umbriel',
        'uranus-ariel',
        'uranus-miranda',
      ],
    },
    {
      name: 'neptune',
      moons: ['neptune-triton', 'neptune-nereid'],
    },
  ],
};
