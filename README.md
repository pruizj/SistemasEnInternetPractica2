# SistemasEnInternetPractica2
-------------------------------------------------------------------------------
## GET /status
Indica que el servidor esta OK y listo para recibir peticiones.

Status: 200 Body: "OKProgramacion-I"

## GET /characters
Devuelve un objeto con todos los personajes de la serie

Status: 200

Body: Array de personajes, cada personaje con el formato del siguiente ejemplo.


{id: 1,

name: "Nombre der personaje",

staus: "Alive",

species: "Human",

episode: [
	{
		name: "nombre episodio 1",
		episode: "S0E1"
	},
	{
		name: "nombre episodio 2",
		episode: "S0E2"
	}]
}

## GET /character/:id
Devuelve un objeto con los datos del personaje con id

Status: 200 Body: objecto con el personaje con el formato del siguiente ejemplo.

{id: 1,

name: "Nombre der personaje",

status: "Alive",

episode: [
	{ 
		name: "nombre episodio 1",
		episode: "S0E1"
	},
	{ 
		name: "nombre episodio 2",
		episode: "S0E2"
	}]
}
## PUT /switchstatus/:id
Cambia el status de un personaje: de vivo a muerto o de muerto a vivo.

Devuelve un objeto con los datos del personaje con id (con el status actualizado)

Si lo realiza correctamente (el personaje existe)

Status: 200 Body: objecto con el personaje con el formato del siguiente ejemplo.

{id: 1,

name: "Nombre der personaje",

status: "Alive",

episode: [
	{ 
		name: "nombre episodio 1",
		episode: "S0E1"
	},
	{ 
		name: "nombre episodio 2",
		episode: "S0E2"
	}]
}
Si el personaje no existe

Status: 404
Body: "Not Found"
## DELETE /character/:id
Borra un personaje con id

Si lo realiza correctamente (el personaje existe).

Status: 200 Body: "OK"

Si el personaje no existe

Status: 404 Body: "Not Found"
