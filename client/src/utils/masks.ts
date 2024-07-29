export const formatCNPJ = (value: string): string => {
        // Remove non-numeric characters
        const cleaned = value.replace(/\D/g, '');
      
        // Apply CNPJ formatting
        if (cleaned.length <= 14) {
          return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        }
      
        return cleaned;
}