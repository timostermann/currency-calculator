# Aufgabe

## Coding Challenge – Developer (Next.js / TypeScript)

### Thema 

API-Integration, Umrechnung & UI

## Aufgabe

Erstelle eine kleine Anwendung mit **Next.js (App Router)**, die aktuelle Wechselkurse von **USD** zu **EUR** und **CHF** lädt und beliebige Beträge umrechnet.

## Datenquelle

Frankfurter API (EZB):

- Aktuelle Kurse: [https://api.frankfurter.app/latest?from=USD&to=EUR,CHF](https://api.frankfurter.app/latest?from=USD&to=EUR,CHF)
- Optional Verlauf 14 Tage: [https://api.frankfurter.app/2025-10-30..2025-11-13?from=USD&to=EUR,CHF](https://api.frankfurter.app/2025-10-30..2025-11-13?from=USD&to=EUR,CHF)

## Funktionalität

- Eingabefeld mit Validierung (nur Zahlen, sinnvolle Grenzen)
- Ausgabe der Umrechnung in **EUR** und **CHF** anhand des neuesten Kurses
- Vordefinierte Schnellwerte (Buttons) für 100 / 1.000 / 10.000 USD
- Anzeige des Datums des verwendeten Wechselkurses
- Optional: Verlauf der letzten 14 Tage als Chart

## Technische Anforderungen

- **Next.js (App Router)** + **TypeScript**
- Kursdaten serverseitig laden
- Betragseingabe clientseitig
- **Tailwind CSS** für UI
- Sauberes Error- und Loading-Handling
- Zahlenformatierung mit Intl.NumberFormat (Locale-gerecht)

## Abgabe

Bitte reiche die Challenge bis Ende der Woche ein:

- **GitHub-Link** zum Repository
- **Live-URL** (z. B. über [Vercel](https://vercel.com/))
- **README-Datei** mit kurzer Beschreibung:
  - Wie bist du vorgegangen?
  - Welche Entscheidungen hast du getroffen?
  - Was würdest du verbessern, wenn du mehr Zeit hättest?

## Bewertungskriterien

- Saubere Code-Struktur und Lesbarkeit
- Sinnvolle Architektur & Komponentenaufteilung
- UX/UI-Qualität und Responsiveness
- Fehler- und State-Handling
- Eigenständigkeit und Problemlösungsfähigkeit
