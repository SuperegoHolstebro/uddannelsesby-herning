export function DocumentStatus(props) {
    return {
      label: props.published ? 'Publiceret' : 'Upubliceret',
      value: props.published ? 'Publiceret' : 'Upubliceret',
      color: props.published ? 'success' : 'warning' as 'success' | 'warning',
    }
  } 
  
  