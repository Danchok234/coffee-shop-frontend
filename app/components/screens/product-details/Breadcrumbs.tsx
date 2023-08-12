import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FC } from 'react'

import styles from "./details.module.scss"


interface IBreadcrumbs {
	productName:string
}

const Breadcrumbs: FC<IBreadcrumbs> = ({productName}) => {
	return (
		<Breadcrumb className={styles.breadcrumbs}>
			<BreadcrumbItem>
				<BreadcrumbLink href='/' className={styles["breadcrumb-home"] }>Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbItem isCurrentPage>
				<BreadcrumbLink className={styles["breadcrumb-curr"] }>{productName}</BreadcrumbLink>
			</BreadcrumbItem>
		</Breadcrumb>
	)
}

export default Breadcrumbs
