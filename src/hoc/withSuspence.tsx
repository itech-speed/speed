import React, { LazyExoticComponent, Suspense } from 'react'

export const withSuspence = (LazyComponent: LazyExoticComponent<any>) => {
  return (props: any) => {
    return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
