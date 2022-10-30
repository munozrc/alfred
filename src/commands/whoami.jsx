async function getMyIPAdress () {
  return await window.fetch('https://ip.seeip.org/geoip')
    .then(res => res.json())
    .catch(() => undefined)
}

export default async function whoami () {
  const response = await getMyIPAdress()

  if (typeof response === 'undefined') {
    return (
      <div>
        <p>Algo salio mal</p>
      </div>
    )
  }

  return (
    <div>
      <p><strong>IP: </strong>{response.ip}</p>
      <p><strong>Código de continente: </strong>{response.continent_code}</p>
      <p><strong>País: </strong>{response.country}</p>
      <p><strong>Código del País: </strong>{response.country_code}</p>
      <p><strong>Región: </strong>{response.region}</p>
      <p><strong>Ciudad: </strong>{response.city}</p>
      <p><strong>Código Postal: </strong>{response.postal_code}</p>
      <p><strong>Organización: </strong>{response.organization}</p>
      <p><strong>Longitud: </strong>{response.longitude}</p>
      <p><strong>Latitud: </strong>{response.latitude}</p>
    </div>
  )
}
