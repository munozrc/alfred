export default async function whoami () {
  const response = await window.fetch('https://ip.seeip.org/geoip')
  const data = await response.json()
  return (
    <div>
      <p><strong>IP: </strong>{data.ip}</p>
      <p><strong>Código de continente: </strong>{data.continent_code}</p>
      <p><strong>País: </strong>{data.country}</p>
      <p><strong>Código del País: </strong>{data.country_code}</p>
      <p><strong>Región: </strong>{data.region}</p>
      <p><strong>Ciudad: </strong>{data.city}</p>
      <p><strong>Código Postal: </strong>{data.postal_code}</p>
      <p><strong>Organización: </strong>{data.organization}</p>
    </div>
  )
}
