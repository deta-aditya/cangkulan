import { useNavigate } from "react-router-dom"

const useNavbarView = () => {
  const navigate = useNavigate()

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    navigate('/')
  }

  return {
    handleBack,
  }
}

export default useNavbarView
