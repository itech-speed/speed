import React, { Suspense } from 'react'

export const withSuspence = (LazyComponent: any) => {
  return (props: any) => {
    return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
