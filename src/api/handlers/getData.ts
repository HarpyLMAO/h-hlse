import type { Database } from 'better-sqlite3'
import context from "../lib/context"

export const getData = async (): Promise<any> => {
  const dbClient: Database = context.get('dbClient')

  if (!dbClient) return {}

  const misc: any = {}
  const inventory: any = {
    health: {},
    resources: {id: {}, amount: {}},
    mission: {id: {}, amount: {}},
    sanctuary: {},
  }
  const talents: any = {}

  dbClient.prepare(`
    SELECT * FROM MiscDataDynamic
    WHERE DataOwner IN ('Player', 'Player0') AND DataName IN (
      'PlayerFirstName',
      'PlayerLastName',
      'BaseInventoryCapacity',
      'PerkPoints'
    )
  `).all().forEach((row) => {
    misc[row.DataName] = row.DataValue
  })

  dbClient.prepare(`
    SELECT * FROM MiscDataDynamic
    WHERE DataOwner = 'ExperienceManager' AND DataName = 'ExperiencePoints'
  `).all().forEach((row) => {
    misc[row.DataName] = row.DataValue
  })

  dbClient.prepare(`
    SELECT * FROM InventoryDynamic
    WHERE CharacterID = 'Player0'
    AND HolderID = 'HealthPotionStorage'
    AND ItemID = 'WoundCleaning'
  `).all().forEach((row) => {
    inventory.health[row.ItemID] = row.Count
  })

  dbClient.prepare(`
    SELECT * FROM InventoryDynamic
    WHERE CharacterID = 'Player0'
    AND HolderID = 'ResourceInventory'
  `).all().forEach((row) => {
    inventory.resources.id[row.ItemID] = row.ItemID;
    inventory.resources.amount[row.ItemID] = row.Count;
  })

  dbClient.prepare(`
    SELECT * FROM InventoryDynamic
    WHERE CharacterID = 'Player0'
    AND HolderID = 'MissionItems'
  `).all().forEach((row) => {
    inventory.mission.id[row.ItemID] = row.ItemID;
    inventory.mission.amount[row.ItemID] = row.Count;
  })

  dbClient.prepare(`
    SELECT * FROM InventoryDynamic
    WHERE CharacterID = 'Player0'
    AND HolderID = 'SanctuaryWheel'
  `).all().forEach((row) => {
    inventory.sanctuary[row.ItemID] = row.Count
  })

  dbClient.prepare(`
    SELECT * FROM PerkDynamic
  `).all().forEach((row) => {
    talents[row.PerkID] = true
  })

  const saveName = context.get('saveName')
  const dbName = context.get('dbName')

  return {
    saveName,
    dbName,
    player: {
      misc,
      inventory,
      talents,
    },
  }
}
