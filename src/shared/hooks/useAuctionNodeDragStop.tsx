import { patchAuctionDiagramsNodes } from '@/services'
import { useCallback, useRef } from 'react'
import type { NodeDragHandler } from 'reactflow'

export default function useAuctionNodeDragStop() {
  const initialPositionsRef = useRef<Record<string, { x: number; y: number }>>({})

  const onNodeDragStart: NodeDragHandler = useCallback((_evt, node) => {
    initialPositionsRef.current[node.id] = { ...node.position }
  }, [])

  const onNodeDragStop: NodeDragHandler = useCallback(async (_evt, node) => {
    const initialPosition = initialPositionsRef.current[node.id]

    if (initialPosition) {
      const hasPositionChanged = initialPosition.x !== node.position.x || initialPosition.y !== node.position.y

      if (!hasPositionChanged) {
        return
      }
    }

    try {
      await patchAuctionDiagramsNodes(node.id, node.position)
      initialPositionsRef.current[node.id] = { ...node.position }
    } catch (e) {
      console.error('Pozitsiyani saqlashda xatolik:', e)
    }
  }, [])

  return { onNodeDragStart, onNodeDragStop }
}
