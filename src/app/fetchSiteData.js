export async function fetchSiteData() {
    try {
        const res = await fetch('https://restaurant-booking-system-production.up.railway.app/api/v1/contacts', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Ошибка при получении данных от Contacts');
        }
        const data = await res.json();
        return data[0]?.name || 'Restaurant - Кулинарное наследие Узбекистана в каждом блюде';
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        return 'Restaurant - Кулинарное наследие Узбекистана в каждом блюде';
    }
}