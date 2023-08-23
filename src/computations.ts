export function totalKill(health: number, damage: number, maxAmmo: number) {
    const bulletsPerKill = toKill(health, damage);
    return Math.floor(maxAmmo / bulletsPerKill);
}

export function toKill(health: number, damage: number): number {
    return Math.ceil(health / damage)
}