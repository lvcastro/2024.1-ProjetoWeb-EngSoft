import axios from 'axios'

// http://www.movable-type.co.uk/scripts/latlong.html
// Calcula a distância (em metros) entre 2 pontos a partir da latitude e longitude
function haversineDist(coord1, coord2) {
  const R = 6371 * 1000 // Raio da terra em metros
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180
  const dLong = ((coord2.lng - coord1.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

const maxDist = 10

export async function makeGroups(ungrouped) {
  let groups = []

  for (const a of ungrouped) {
    let added = false

    for (const g of groups) {
      if (a.problem != g.problem || a.status != g.status) continue

      const dist = haversineDist(a.coord, g.center)

      if (dist <= maxDist) {
        g.center = {
          lat: (g.center.lat * g.length + a.coord.lat) / (g.length + 1),
          lng: (g.center.lng * g.length + a.coord.lng) / (g.length + 1),
        }
        g.push(a)

        added = true
        break
      }
    }

    if (!added) {
      let newG = [a]
      newG.center = {
        lat: a.coord.lat,
        lng: a.coord.lng,
      }
      newG.problem = a.problem
      newG.status = a.status
      groups.push(newG)
    }
  }

  for (const g of groups) {
    g.sort((a, b) => a.createdAt > b.createdAt)

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${g.center.lat}&lon=${g.center.lng}`,
      )
      if (response.data.display_name) {
        g.address = response.data.display_name
      } else {
        g.address = 'Endereço não encontrado'
      }
    } catch (error) {
      console.error('Erro ao obter o endereço:', error)
      g.address = 'Erro ao obter o endereço'
    }
  }

  return groups
}
