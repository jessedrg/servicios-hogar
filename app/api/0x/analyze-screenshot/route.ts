import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")
    const mimeType = image.type || "image/png"
    const dataUrl = `data:${mimeType};base64,${base64}`

    const { text } = await generateText({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: dataUrl,
            },
            {
              type: "text",
              text: `Analiza esta captura de pantalla y extrae la información del lead/cliente para un servicio de urgencias del hogar.

Extrae los siguientes campos si están disponibles:
- name: nombre del cliente
- phone: número de teléfono (formato español, sin espacios)
- city: ciudad o ubicación
- service: tipo de servicio (debe ser uno de: fontanero, electricista, cerrajero, desatasco, calderas)
- problem: descripción del problema

Responde SOLO con un JSON válido con estos campos. Si no encuentras un campo, usa una cadena vacía.
Ejemplo de respuesta:
{"name": "Juan García", "phone": "612345678", "city": "Barcelona", "service": "fontanero", "problem": "Fuga de agua en el baño"}

Si la imagen no contiene información de un lead o cliente, responde con:
{"error": "No se encontró información de lead en la imagen"}`,
            },
          ],
        },
      ],
    })

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
    const leadData = JSON.parse(cleanedText)

    if (leadData.error) {
      return Response.json({ error: leadData.error }, { status: 400 })
    }

    return Response.json({
      success: true,
      lead: {
        name: leadData.name || "",
        phone: leadData.phone || "",
        city: leadData.city || "",
        service: leadData.service || "",
        problem: leadData.problem || "",
      },
    })
  } catch (error) {
    console.error("Error analyzing screenshot:", error)
    return Response.json({ error: "Error al analizar la imagen" }, { status: 500 })
  }
}
